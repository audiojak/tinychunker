import { DEFAULT_CHUNK_SIZE } from './constants';

export function chunkCodeIR(code, chunkSize = DEFAULT_CHUNK_SIZE) {
    
    // THIS IS A STUB
    
    // Split the code into chunks
    const codeChunks = code.match(new RegExp(`.{1,${chunkSize}}`, 'g'));
    return codeChunks;
}