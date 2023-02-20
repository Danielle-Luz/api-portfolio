import express, { Application } from "express";
import { errorHandler } from "./errors";

export const api: Application = express();

api.use(express.json());

// routes

api.use(errorHandler);