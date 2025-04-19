import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db";
import userRoutes from "./routes/user.routes";
import questionRoutes from "./routes/question.routes.ts"
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFound } from "./utils/errorMiddleware";

dotenv.config();

const app = express();
app.use(helmet());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL!, 'http://localhost:5173'],
        credentials: true,
    })
);

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "UP" });
});

app.use("/api/user", userRoutes);
app.use(
    cors({
        origin: [process.env.FRONTEND_URL!, 'http://localhost:5173'],
        credentials: true,
    })
);
app.use('/api/question', questionRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running in ${process.env.NODE_ENV || "development"} mode`);
            console.log(`API ready at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });

process.on("unhandledRejection", (err: Error) => {
    console.error("Unhandled Rejection:", err.message);
    process.exit(1);
});
