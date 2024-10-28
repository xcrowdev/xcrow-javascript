import { Xcrow } from '../../packages/node/src';
import * as dotenv from 'dotenv';
dotenv.config();

async function getVaultDetails() {
  const xcrow = new Xcrow({
    apiKey: process.env.API_KEY,
    applicationId: process.env.APPLICATION_ID,
    environment: 'test',
  });

  const vault = await xcrow.getVaultDetails(
    '7a4ac28b-ded1-4cca-9c2a-0c91f8a8371e',
  );
  console.log(vault);
}

getVaultDetails();
