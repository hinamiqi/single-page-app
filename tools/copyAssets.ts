import shell from 'shelljs';

shell.rm('-R', 'dist/frontend');
shell.mkdir('dist');
shell.mkdir('dist/frontend');
shell.cp('-R', 'src/frontend/static', 'dist/frontend/static');