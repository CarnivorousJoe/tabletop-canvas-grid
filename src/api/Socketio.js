import openSocket from 'socket.io-client';
const addr = 'http://ddwhiteboard-env.ebi8drsarf.us-east-2.elasticbeanstalk.com:8090';
const socket = openSocket(addr);

export { socket }