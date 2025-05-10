import 'module-alias/register';

import { appConfig } from './config/app';

const app = appConfig();
const PORT = process?.env?.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
