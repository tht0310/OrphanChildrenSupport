import {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from "antd/lib/upload/interface";
import moment from "moment";
import { momentToPost } from "./FormatDateTimeService";
import { useState, useEffect } from "react";

const msWordExtensions = ["doc", "docx"];
const msExcelExtensions = ["xls", "xlsx"];
const msPowerPointExtensions = ["ppt", "pptx"];
const msPdfExtensions = ["pdf"];
export class DataServices {
  static uploadFileRequest({ file, onSuccess }: any) {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

  static handleFiles(
    key: number,
    selectedFiles: any,
    info: UploadChangeParam<UploadFile<any>>
  ) {
    const files = [...selectedFiles];
    switch (info.file.status) {
      case "uploading":
        break;
      case "done":
        files[key].push(info.file);
        break;

      default:
        // error or removed
        const filesTmp = [];
        files[key].map((file: UploadFile<any>) => {
          if (file.uid !== info.file.uid) {
            filesTmp.push(file);
          }
        });
        files[key] = filesTmp;
        break;
    }
    return files;
  }

  static IsEmail(text: string): boolean {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)) {
      return true;
    }
    return false;
  }

  static removeEmpty<T>(obj: any): T {
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value !== undefined) {
        if (moment.isMoment(value)) {
          newObj[key] = momentToPost(value);
        } else {
          newObj[key] = value;
        }
      }
    });
    return newObj;
  }

  static getBase64(img: RcFile, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  static emailToAccountName(email: string): string {
    if (email?.length > 0) {
      let accountName = "";
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < email.length; i++) {
        if (email[i] === "@") {
          break;
        }
        accountName += email[i];
      }
      return accountName;
    }
    return undefined;
  }


  static isMSWord(extension: string) {
    if (msWordExtensions.some((ext) => ext === extension)) {
      return true;
    }
    return false;
  }

  static isMSExcel(extension: string) {
    if (msExcelExtensions.some((ext) => ext === extension)) {
      return true;
    }
    return false;
  }

  static isMSPowerPoint(extension: string) {
    if (msPowerPointExtensions.some((ext) => ext === extension)) {
      return true;
    }
    return false;
  }

  static isMSPdf(extension: string) {
    if (msPdfExtensions.some((ext) => ext === extension)) {
      return true;
    }
    return false;
  }

  static useDebounce(value: string, delay: number) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
  }
}
