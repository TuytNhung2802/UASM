import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';


type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  application_high_school_script: {
    ApplicationHighSchoolScript: MessageTypeDefinition
    ApplicationHighSchoolScriptResponse: MessageTypeDefinition
    ApplicationHighSchoolScriptWithCandidate: MessageTypeDefinition
    ApplicationHighSchoolScripts: MessageTypeDefinition
    ApplicationHighSchoolScriptsResponse: MessageTypeDefinition
    UpdateApplicationHighSchoolScript: MessageTypeDefinition
  }
  area: {
    Area: MessageTypeDefinition
    AreaResponse: MessageTypeDefinition
    Areas: MessageTypeDefinition
    AreasResponse: MessageTypeDefinition
    UpdateArea: MessageTypeDefinition
  }
  candidate: {
    Candidate: MessageTypeDefinition
    CandidateResponse: MessageTypeDefinition
    Candidates: MessageTypeDefinition
    CandidatesResponse: MessageTypeDefinition
    UpdateCandidate: MessageTypeDefinition
  }
  gender: {
    Gender: MessageTypeDefinition
    GenderResponse: MessageTypeDefinition
    Genders: MessageTypeDefinition
    GendersResponse: MessageTypeDefinition
    UpdateGender: MessageTypeDefinition
  }
  priority: {
    Priorities: MessageTypeDefinition
    PrioritiesResponse: MessageTypeDefinition
    Priority: MessageTypeDefinition
    PriorityResponse: MessageTypeDefinition
    UpdatePriority: MessageTypeDefinition
  }
}

