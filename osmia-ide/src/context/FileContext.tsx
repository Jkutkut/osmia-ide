import { createContext } from 'react';
import {FileHandlerObject} from '../model';

const FileContext = createContext<FileHandlerObject>({});

export default FileContext;
