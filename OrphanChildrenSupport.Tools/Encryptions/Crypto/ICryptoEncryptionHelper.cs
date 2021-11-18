namespace OrphanChildrenSupport.Tools.Encryptions
{
    public interface ICryptoEncryptionHelper
    {
        string Encrypt(string plainText);
        string Decrypt(string encryptedText);
        string CreateMD5FromPlainText(string plainText);
    }
}
