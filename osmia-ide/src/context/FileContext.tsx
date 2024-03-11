import { createContext } from 'react';
import {FileHandlerObject} from '@/src/model';

const FileContext = createContext<FileHandlerObject>({});

export default FileContext;
