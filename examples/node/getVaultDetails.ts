import { Xcrow } from '../../packages/node/src';
import * as dotenv from 'dotenv';
dotenv.config();

async function getVaultDetails() {
  const xcrow = new Xcrow({
    apiKey: process.env.API_KEY,
    applicationId: process.env.APPLICATION_ID,
  });

  const vault = await xcrow.getVaultDetails(
    '24977311-156a-4928-88a7-7006d91d1aa1',
  );
  console.log(vault);
}

getVaultDetails();
