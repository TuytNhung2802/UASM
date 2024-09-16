import GenderService from "@/services/genders";
import AreaService from "@/services/areas";
import type {
  Area,
  Gender,
  Priority,
  SubjectBlock,
  Majors,
  Basic,
  User,
} from "@/utils/types";
import { ReactElement, createContext, useEffect, useState } from "react";
import PriorityService from "@/services/priorities";
import SubjectBlockService from "@/services/subject-blocks";
import MajorService from "@/services/majors";
import ObjectAdmissionService from "@/services/object-admissions";
import UserService from "@/services/users";
import { useAppSelector } from "@/redux/hooks";
import { chatSelector } from "@/redux/selectors";

type Init = {
  genders: Array<Gender>;
  areas: Array<Area>;
  priorities: Array<Priority>;
  subjectBlocks: Array<SubjectBlock>;
  majors: Array<Majors>;
  objectAdmissions: Array<Basic>;
  admissionStaffs: Array<User>;
  auth: {
    id: string;
    email: string;
  };
};

const initialState: Init = {
  genders: [],
  areas: [],
  priorities: [],
  subjectBlocks: [],
  majors: [],
  objectAdmissions: [],
  admissionStaffs: [],
  auth: {
    id: "",
    email: "",
  },
};

export const GlobalContext = createContext(initialState);

const GlobalContextProvider = ({ children }: { children: ReactElement }) => {
  const { token } = useAppSelector(chatSelector);
  const [genders, setGenders] = useState<Array<Gender>>([]);
  const [areas, setAreas] = useState<Array<Area>>([]);
  const [priorities, setPriorities] = useState<Array<Priority>>([]);
  const [subjectBlocks, setSubjectBlocks] = useState<Array<SubjectBlock>>([]);
  const [majors, setMajors] = useState<Array<Majors>>([]);
  const [objectAdmissions, setObjectAdmissions] = useState<Array<Basic>>([]);
  const [admissionStaffs, setAdmissionStaffs] = useState<Array<User>>([]);
  const [auth, setAuth] = useState({
    id: "",
    email: "",
  });

  useEffect(() => {
    loadGenders();
    loadAreas();
    loadPriorities();
    loadSubjectBlocks();
    loadMajors();
    loadObjectAdmissions();
    loadAdmissionStaffs();
  }, []);

  useEffect(() => {
    let _token: string = "";
    if (token) {
      _token = token;
    } else {
      _token = localStorage.getItem("token") as string;
    }
    if (_token) {
      getAuth();
    }
  }, [token]);

  const getAuth = async () => {
    const v = (await UserService.verify()) as { id: string; email: string };
    if (v) {
      setAuth(v);
    }
  };

  const loadAdmissionStaffs = async () => {
    const res = await UserService.getUsers({
      body: {
        role: {
          name: "admission-staff",
        },
      },
    });
    if (res) {
      setAdmissionStaffs(res);
    }
  };

  const loadObjectAdmissions = async () => {
    const res = await ObjectAdmissionService.getObjectAdmissions();
    if (res) {
      setObjectAdmissions(res);
    }
  };

  const loadMajors = async () => {
    const res = await MajorService.getMajors();
    if (res) {
      setMajors(res);
    }
  };

  const loadGenders = async () => {
    const res = await GenderService.getGenders();
    if (res) {
      setGenders(res);
    }
  };

  const loadAreas = async () => {
    const res = await AreaService.getAreas();
    if (res) {
      setAreas(res);
    }
  };

  const loadPriorities = async () => {
    const res = await PriorityService.getPriorities();
    if (res) {
      setPriorities(res);
    }
  };

  const loadSubjectBlocks = async () => {
    const res = await SubjectBlockService.getSubjectBlocks();
    if (res) {
      setSubjectBlocks(res);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        genders,
        areas,
        priorities,
        subjectBlocks,
        majors,
        objectAdmissions,
        admissionStaffs,
        auth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
