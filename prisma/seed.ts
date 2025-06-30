import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed process...');

  // Create Symbols
  console.log('📊 Creating symbols...');
  const symbols = await Promise.all([
    prisma.symbol.create({
      data: {
        codeSymbol: 'EUR/USD',
        label: 'Euro vs US Dollar',
      },
    }),
    prisma.symbol.create({
      data: {
        codeSymbol: 'GBP/USD',
        label: 'British Pound vs US Dollar',
      },
    }),
    prisma.symbol.create({
      data: {
        codeSymbol: 'USD/JPY',
        label: 'US Dollar vs Japanese Yen',
      },
    }),
    prisma.symbol.create({
      data: {
        codeSymbol: 'AUD/USD',
        label: 'Australian Dollar vs US Dollar',
      },
    }),
    prisma.symbol.create({
      data: {
        codeSymbol: 'BTC/USD',
        label: 'Bitcoin vs US Dollar',
      },
    }),
  ]);

  // Create Operation Types
  console.log('⚡ Creating operation types...');
  const operationTypes = await Promise.all([
    prisma.operationType.create({
      data: {
        label: 'Buy',
        operation: 'BUY',
      },
    }),
    prisma.operationType.create({
      data: {
        label: 'Sell',
        operation: 'SELL',
      },
    }),
    prisma.operationType.create({
      data: {
        label: 'Buy Limit',
        operation: 'BUY_LIMIT',
      },
    }),
    prisma.operationType.create({
      data: {
        label: 'Sell Limit',
        operation: 'SELL_LIMIT',
      },
    }),
  ]);

  // Create Results
  console.log('📈 Creating results...');
  const results = await Promise.all([
    prisma.result.create({
      data: {
        label: 'Profit',
        result: 'PROFIT',
      },
    }),
    prisma.result.create({
      data: {
        label: 'Loss',
        result: 'LOSS',
      },
    }),
    prisma.result.create({
      data: {
        label: 'Break Even',
        result: 'BREAK_EVEN',
      },
    }),
  ]);

  // Create Status Operations
  console.log('🔄 Creating status operations...');
  const statusOperations = await Promise.all([
    prisma.statusOperation.create({
      data: {
        label: 'Open',
        status: 'OPEN',
      },
    }),
    prisma.statusOperation.create({
      data: {
        label: 'Closed',
        status: 'CLOSED',
      },
    }),
    prisma.statusOperation.create({
      data: {
        label: 'Pending',
        status: 'PENDING',
      },
    }),
    prisma.statusOperation.create({
      data: {
        label: 'Cancelled',
        status: 'CANCELLED',
      },
    }),
  ]);

  // Create Strategies
  console.log('🎯 Creating strategies...');
  const strategies = await Promise.all([
    prisma.strategy.create({
      data: {
        name: 'RSI + MACD Strategy',
        description: 'Buy when RSI is oversold and MACD crosses above signal line',
        status: 'active',
      },
    }),
    prisma.strategy.create({
      data: {
        name: 'Moving Average Crossover',
        description: 'Buy when fast MA crosses above slow MA',
        status: 'active',
      },
    }),
    prisma.strategy.create({
      data: {
        name: 'Support & Resistance',
        description: 'Buy at support levels, sell at resistance levels',
        status: 'active',
      },
    }),
    prisma.strategy.create({
      data: {
        name: 'Breakout Strategy',
        description: 'Enter trades when price breaks significant levels',
        status: 'active',
      },
    }),
    prisma.strategy.create({
      data: {
        name: 'Scalping Strategy',
        description: 'Quick trades for small profits',
        status: 'inactive',
      },
    }),
  ]);

  // Create Confirmations
  console.log('✅ Creating confirmations...');
  const confirmations = await Promise.all([
    prisma.confirmation.create({
      data: {
        name: 'RSI Confirmation',
        description: 'RSI indicator shows oversold/overbought conditions',
        status: 'active',
      },
    }),
    prisma.confirmation.create({
      data: {
        name: 'MACD Confirmation',
        description: 'MACD line crosses above/below signal line',
        status: 'active',
      },
    }),
    prisma.confirmation.create({
      data: {
        name: 'Volume Confirmation',
        description: 'Trading volume is above average',
        status: 'active',
      },
    }),
    prisma.confirmation.create({
      data: {
        name: 'Trend Confirmation',
        description: 'Price action confirms the overall trend',
        status: 'active',
      },
    }),
  ]);

  // Create Conditions
  console.log('🔍 Creating conditions...');
  const conditions = await Promise.all([
    prisma.condition.create({
      data: {
        name: 'RSI < 30',
        description: 'RSI indicator is below 30 (oversold)',
        confirmationId: confirmations[0].id,
        status: 'active',
      },
    }),
    prisma.condition.create({
      data: {
        name: 'RSI > 70',
        description: 'RSI indicator is above 70 (overbought)',
        confirmationId: confirmations[0].id,
        status: 'active',
      },
    }),
    prisma.condition.create({
      data: {
        name: 'MACD Cross Up',
        description: 'MACD line crosses above signal line',
        confirmationId: confirmations[1].id,
        status: 'active',
      },
    }),
    prisma.condition.create({
      data: {
        name: 'Volume > Average',
        description: 'Current volume is 1.5x above 20-period average',
        confirmationId: confirmations[2].id,
        status: 'active',
      },
    }),
  ]);

  // Create Strategy-Confirmation relationships
  console.log('🔗 Creating strategy confirmations...');
  await Promise.all([
    prisma.strategyConfirmation.create({
      data: {
        strategyId: strategies[0].id,
        confirmationId: confirmations[0].id,
        status: 'active',
      },
    }),
    prisma.strategyConfirmation.create({
      data: {
        strategyId: strategies[0].id,
        confirmationId: confirmations[1].id,
        status: 'active',
      },
    }),
    prisma.strategyConfirmation.create({
      data: {
        strategyId: strategies[1].id,
        confirmationId: confirmations[3].id,
        status: 'active',
      },
    }),
  ]);

  // Create Sample Trades
  console.log('💰 Creating sample trades...');
  const trades: any[] = [];
  
  // Generate trades for the last 30 days
  for (let i = 0; i < 50; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const entryDate = new Date();
    entryDate.setDate(entryDate.getDate() - randomDaysAgo);

    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const randomOperationType = operationTypes[Math.floor(Math.random() * operationTypes.length)];
    const randomResult = results[Math.floor(Math.random() * results.length)];
    const randomStatus = statusOperations[Math.floor(Math.random() * statusOperations.length)];
    const randomStrategy = strategies[Math.floor(Math.random() * strategies.length)];

    // Generate realistic prices based on symbol
    let basePrice = 1.1000; // EUR/USD base
    if (randomSymbol.codeSymbol === 'GBP/USD') basePrice = 1.2500;
    else if (randomSymbol.codeSymbol === 'USD/JPY') basePrice = 110.00;
    else if (randomSymbol.codeSymbol === 'AUD/USD') basePrice = 0.7500;
    else if (randomSymbol.codeSymbol === 'BTC/USD') basePrice = 45000.00;

    const priceVariation = (Math.random() - 0.5) * 0.02; // ±1% variation
    const entryPrice = basePrice * (1 + priceVariation);
    
    const isProfit = randomResult.result === 'PROFIT';
    const exitVariation = isProfit 
      ? Math.random() * 0.01 + 0.002 // 0.2% to 1.2% profit
      : -(Math.random() * 0.01 + 0.002); // -0.2% to -1.2% loss
    
    const exitPrice = entryPrice * (1 + exitVariation);

    const trade = await prisma.trade.create({
      data: {
        symbolId: randomSymbol.id,
        operationTypeId: randomOperationType.id,
        resultId: randomResult.id,
        statusOperationId: randomStatus.id,
        strategyId: randomStrategy.id,
        quantity: Math.floor(Math.random() * 10000) + 1000, // 1000-11000 units
        dateEntry: entryDate,
        priceEntry: Number(entryPrice.toFixed(randomSymbol.codeSymbol === 'USD/JPY' ? 2 : 5)),
        priceExit: Number(exitPrice.toFixed(randomSymbol.codeSymbol === 'USD/JPY' ? 2 : 5)),
        spread: Math.random() * 0.0005 + 0.0001, // 0.1 to 0.6 pips
      },
    });

    trades.push(trade);

    // Add trade details for some trades
    if (Math.random() > 0.7) { // 30% of trades get detailed info
      await prisma.tradeDetail.create({
        data: {
          tradeId: trade.id,
          observaciones: `Trade executed based on ${randomStrategy.name}. ${
            isProfit ? 'Target reached successfully.' : 'Stop loss triggered.'
          }`,
          imageUrlpre: `https://example.com/charts/pre_${trade.id}.jpg`,
          imageUrlpost: `https://example.com/charts/post_${trade.id}.jpg`,
        },
      });
    }
  }

  console.log('✅ Seed completed successfully!');
  console.log(`📊 Created ${symbols.length} symbols`);
  console.log(`⚡ Created ${operationTypes.length} operation types`);
  console.log(`📈 Created ${results.length} results`);
  console.log(`🔄 Created ${statusOperations.length} status operations`);
  console.log(`🎯 Created ${strategies.length} strategies`);
  console.log(`✅ Created ${confirmations.length} confirmations`);
  console.log(`🔍 Created ${conditions.length} conditions`);
  console.log(`💰 Created ${trades.length} trades`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });