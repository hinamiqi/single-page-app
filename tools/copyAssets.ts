import * as shell from 'shelljs';

shell.mkdir('dist/frontend');
shell.cp('-R', 'src/frontend/static', 'dist/frontend/static');