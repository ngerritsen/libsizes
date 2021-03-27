import express, { Application } from "express";
import cors from "cors";
import path from "path";
import LibraryRepository from "./LibraryRepository";
import AnalysisService from "./AnalysisService";

const rootPath = path.join(__dirname, "..");

export default function routes(
  app: Application,
  libraryRepository: LibraryRepository,
  analysisService: AnalysisService
): void {
  app.use(express.json());
  app.use(express.static("public"));
  app.use(
    cors({
      origin: true,
    })
  );

  app.get("/api/libraries", (req, res) => {
    libraryRepository.getAll().then((result) => res.json(result));
  });

  app.post("/api/analyses/:id", async (req, res) => {
    try {
      const { params, body } = req;
      const { library, existing } = await analysisService.analyze(
        params.id,
        body.libraryString
      );

      res.json({
        success: true,
        exists: Boolean(existing),
        version: library.version,
        existing,
      });
    } catch (error) {
      res.json({ success: false, error: error.message });
    }
  });

  app.get("*", (_, res) => {
    res.sendFile(path.join(rootPath, "/public/index.html"));
  });
}
