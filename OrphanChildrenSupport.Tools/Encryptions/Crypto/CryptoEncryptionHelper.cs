using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace OrphanChildrenSupport.Tools.Encryptions
{
    public class CryptoEncryptionHelper : ICryptoEncryptionHelper
    {
        private string IV { get; }
        public string Key { get; }

        public CryptoEncryptionHelper(IConfiguration configuration)
        {
            IV = configuration["CryptoEncryption:IV"];
            Key = configuration["CryptoEncryption:Key"];
        }

        public string Encrypt(string plainText)
        {
            //convert plainText into md5Text
            var md5Text = CreateMD5FromPlainText(plainText);

            byte[] rgbIV = Encoding.UTF8.GetBytes(IV);
            byte[] bytesOfText = Encoding.UTF8.GetBytes(md5Text);
            PasswordDeriveBytes passwordDeriveBytes = new(Key, null);
            byte[] rgbKey = passwordDeriveBytes.GetBytes(32);
            ICryptoTransform transform = new RijndaelManaged
            {
                Mode = CipherMode.CBC,
            }.CreateEncryptor(rgbKey, rgbIV);
            MemoryStream memoryStream = new();
            CryptoStream cryptoStream = new(memoryStream, transform, CryptoStreamMode.Write);
            cryptoStream.Write(bytesOfText, 0, bytesOfText.Length);
            cryptoStream.FlushFinalBlock();
            byte[] inArray = memoryStream.ToArray();
            memoryStream.Close();
            cryptoStream.Close();
            return Convert.ToBase64String(inArray);
        }

        public string Decrypt(string encryptedText)
        {
            byte[] rgbIV = Encoding.ASCII.GetBytes(IV);
            byte[] array = Convert.FromBase64String(encryptedText);
            PasswordDeriveBytes passwordDeriveBytes = new(Key, null);
            byte[] rgbKey = passwordDeriveBytes.GetBytes(32);
            ICryptoTransform transform = new RijndaelManaged
            {
                Mode = CipherMode.CBC
            }.CreateDecryptor(rgbKey, rgbIV);
            MemoryStream memoryStream = new(array);
            CryptoStream cryptoStream = new(memoryStream, transform, CryptoStreamMode.Read);
            byte[] byteArray = new byte[array.Length];
            int count = cryptoStream.Read(byteArray, 0, byteArray.Length);
            memoryStream.Close();
            cryptoStream.Close();
            return Encoding.UTF8.GetString(byteArray, 0, count);
        }

        public string CreateMD5FromPlainText(string plainText)
        {
            MD5 mh = MD5.Create();
            byte[] inputBytes = Encoding.ASCII.GetBytes(plainText);
            byte[] hash = mh.ComputeHash(inputBytes);
            StringBuilder sb = new();
            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }
            return sb.ToString();
        }
    }
}
