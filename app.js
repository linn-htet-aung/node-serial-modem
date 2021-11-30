let serialportgsm = require('serialport-gsm');
let atu = serialportgsm.Modem();
let options = {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    xon: false,
    rtscts: false,
    xoff: false,
    xany: false,
    buffersize: 0,
    autoDeleteOnReceive: true,
    enableConcatenation: true
};

atu.open('/dev/ttyUSB0', options, (data) => {console.log(data)});
atu.on('open', () => {
    atu.initializeModem(msg => console.log('initialize msg:', msg));
    atu.setModemMode(msg => console.log('set pdu msg:', msg), 'PDU');
    atu.sendSMS('+6583XXXXX', `Hello there Picobox!`, false, (response) => {
        console.log('message status', response);
    });
});
atu.on('close', msg => console.log('on close msg:' , msg));
atu.on('error',  msg => console.log('on error msg:' , msg));