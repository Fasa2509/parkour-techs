import { Dispatch, SetStateAction, createContext } from "react";

import { CompleteWorker } from "prisma/zod/worker";

interface ContextProps {
    // Context Props
    workers: Omit<CompleteWorker, 'user' | 'userId'>[];

    // Context Methods
    setWorkers: Dispatch<SetStateAction<Omit<CompleteWorker, 'user' | 'userId'>[]>>;
};

export const WorkerContext = createContext({} as ContextProps);
