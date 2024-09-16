/* eslint-disable @typescript-eslint/no-explicit-any */
import { EFILE, ELEVEL, EMessageType } from "./enums";

export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type Message = {
  type: EMessageType;
  content: string;
  sender: string;
  room: string;
};

export type FileType = {
  id: string;
  name: string;
  path: string;
  extension: EFILE;
};

export type Basic = {
  id: string;
  name: string;
};

export type Gender = Prettify<
  {
    candidates?: [];
  } & Basic
>;

export type Area = Prettify<
  {
    candidates?: [];
  } & Basic
>;

export type Priority = Prettify<
  {
    candidates?: [];
  } & Basic
>;

export type SubjectBlock = Prettify<
  {
    subjects: [];
    basedOnHighSchoolExamResults: [];
    basedOnHighSchoolTranscripts: [];
  } & Basic
>;

export type Majors = Prettify<
  {
    educationalLevel: ELEVEL;
    industryCode: string;
    description: string;
    memberSchool: any;
    basedOnHighSchoolExamResults: Array<SubjectBlock>;
    basedOnHighSchoolTranscripts: Array<SubjectBlock>;
    subMajors: Array<any>;
  } & Basic
>;

export type MemberSchool = {
  id: string;
  name: string;
  link: string;
  university?: boolean;
  afterUniversity?: boolean;
  majors: Array<Majors>;
};

export type User = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: {
    id: string;
    name: string;
  };
  socket: string;
  ip: string;
};
