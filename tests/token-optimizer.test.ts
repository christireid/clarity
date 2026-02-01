import { TokenOptimizer } from '../lib/token-optimization';
import { ContextWindow } from '../lib/token-optimization/types';

// Mock messages
const messages = [
  { role: 'system' as const, content: 'You are a helpful assistant.' },
  { role: 'user' as const, content: 'Hello, how are you?' },
  { role: 'assistant' as const, content: 'I am fine, thank you!' },
  { role: 'user' as const, content: 'Tell me a joke.' },
  { role: 'assistant' as const, content: 'Why did the chicken cross the road? To get to the other side.' },
  // Add many more to force compression
  ...Array.from({ length: 50 }).map((_, i) => ({
    role: 'user' as const,
    content: `Message ${i} with some content to take up tokens.`
  }))
];

async function runTests() {
  console.log('🧪 Running Token Optimizer Tests...\n');

  const config: ContextWindow = {
    maxTokens: 500, // Small window to force optimization
    strategy: 'hybrid',
    keepSystemMessages: true
  };

  const optimizer = new TokenOptimizer({
    contextWindow: config,
    memoryConfig: { shortTermSize: 10, longTermSize: 50, compressionThreshold: 100 }
  });

  console.log('--- Test 1: Context Window Optimization ---');
  const result = optimizer.context.optimize(messages);
  
  console.log(`Original Tokens: ${result.stats.original}`);
  console.log(`Optimized Tokens: ${result.stats.optimized}`);
  console.log(`Saved: ${result.stats.saved} (${result.stats.savedPercentage.toFixed(1)}%)`);
  
  // Assertions
  if (result.stats.optimized <= config.maxTokens) {
    console.log('✅ PASS: Context fits within maxTokens');
  } else {
    console.error('❌ FAIL: Context exceeds maxTokens');
  }

  if (result.messages[0].role === 'system') {
    console.log('✅ PASS: System message preserved');
  } else {
    console.error('❌ FAIL: System message lost');
  }

  console.log('\n--- Test 2: Compression ---');
  const longText = "This is a very long text " .repeat(100);
  const compressed = await optimizer.compressor.compress(longText);
  console.log(`Original Length: ${longText.length}`);
  console.log(`Compressed Length: ${compressed.compressed.length}`);
  
  if (compressed.stats.savedPercentage > 0) {
    console.log('✅ PASS: Compression reduced size');
  } else {
    console.error('❌ FAIL: Compression failed');
  }

  console.log('\n✨ All tests completed.');
}

runTests().catch(console.error);
