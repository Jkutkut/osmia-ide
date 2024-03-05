import { createContext } from 'react';
import fileHandler, {FileHandlerObject} from '../hooks/fileHandler';

const FileContext = createContext<FileHandlerObject>({});

export default FileContext;
