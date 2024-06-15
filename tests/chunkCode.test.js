import { Llama3Tokenizer } from 'llama3tokenizer';
import assert from 'assert';
import { chunkCode } from '../src/chunkCode.js';
import { DEFAULT_CHUNK_SIZE } from '../src/constants.js';
import { exampleCodeString1 } from './exampleCodeString.js';

// Test case
describe('chunkCode', () => {
    it('should chunk code correctly under a max size limit', () => {
        const maxSize = DEFAULT_CHUNK_SIZE; // Arbitrary max chunk size
        const chunks = chunkCode(maxSize, exampleCodeString1);
        const tokenizer = new Llama3Tokenizer();

        // Check if each chunk is under or equal to the max size
        chunks.forEach(chunk => {
            assert(tokenizer.encode(chunk) <= maxSize, `Chunk exceeds max size: ${tokenizer.encode(chunk)}`);
        });

        // Check if chunks maintain meaning (basic check for function integrity)
        const reconstructedCode = chunks.join('');
        assert(reconstructedCode === exampleCodeString1, 'Chunks do not maintain code integrity');
    });
});