import express, { Application } from "express";

export const api: Application = express();

api.use(express.json());