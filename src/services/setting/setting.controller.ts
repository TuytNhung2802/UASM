import { Request, Response } from "express";
import { MyEventEmitter } from "../../events";
import request from "request";

const importQATemplate = (request: Request, response: Response) => {
  try {
    const file = request.file;
    MyEventEmitter.emit("upload_file", { data: file, routing: "qa" });
    return response.status(200).json("Done");
  } catch (error) {}
};

const storePinecone = (request: Request, response: Response) => {
  try {
    MyEventEmitter.emit("store_docs_pinecone");
    response.status(200).json("done");
  } catch (error) {}
};

const generateSourceFromReport = (request: Request, response: Response) => {
  try {
    MyEventEmitter.emit("generate_source_from_report");
    return response.status(200).json("Done");
  } catch (error) {}
};

const syncRule = (_request: Request, response: Response) => {
  try {
    request.get("http://localhost:1111/import-rule");
    response.status(200).json("done");
  } catch (error) {}
};

const statisticSubMajor = (_request: Request, response: Response) => {
  try {
    request.get("http://localhost:1111/statistic-submajor");
    response.status(200).json("done");
  } catch (error) {}
};

const settingController = {
  importQATemplate,
  syncRule,
  statisticSubMajor,
  generateSourceFromReport,
  storePinecone,
};

export default settingController;
