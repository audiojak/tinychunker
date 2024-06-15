import llama3Tokenizer from 'llama3-tokenizer-js';
import assert from 'assert';
import { chunkCode } from '../src/chunkCode.js';
import { DEFAULT_CHUNK_SIZE } from '../src/constants.js';
import { exampleCodeString1 } from './exampleCodeStrings.js';

// Test case
describe('chunkCode', () => {
    it('should chunk code correctly under a max size limit', () => {
        const maxSize = DEFAULT_CHUNK_SIZE; // Arbitrary max chunk size
        const chunks = chunkCode(maxSize, exampleCodeString1);

        // Check if each chunk is under or equal to the max size
        chunks.forEach(chunk => {
            const tokens = llama3Tokenizer.encode(chunk).length;
            assert(tokens <= maxSize, `Chunk exceeds max size: ${tokens}`);
        });

        // Check if chunks maintain meaning (basic check for function integrity)
        const reconstructedCode = chunks.join('');
        assert(reconstructedCode === exampleCodeString1, 'Chunks do not maintain code integrity');
    });
});