'use client'
import { FC, ReactNode, useEffect, useReducer, useState } from "react";

import { WorkerContext } from "./WorkerContext";
import { CompleteWorker } from "prisma/zod/worker";

export interface AuthState {
    workers: Omit<CompleteWorker, 'user' | 'userId'>[];
};

interface Props {
    children: JSX.Element | ReactNode;
};

export const WorkerProvider: FC<Props> = ({ children }) => {

    const [workers, setWorkers] = useState<Omit<CompleteWorker, 'user' | 'userId'>[]>([]);

    return (
        <WorkerContext.Provider value={{
            workers,
            setWorkers,
        }}>
            {children}
        </WorkerContext.Provider>
    );
};
