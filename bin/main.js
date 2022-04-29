let MessageTemplatesProcess = require('../obj/src/container/MessageTemplatesProcess').MessageTemplatesProcess;

try {
    new MessageTemplatesProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
