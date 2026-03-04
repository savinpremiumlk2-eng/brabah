export const commands = [];

function cmd(info, func) {
    const data = { ...info };
    data.function = func;
    data.dontAddCommandList = info.dontAddCommandList ?? false;
    data.desc = info.desc ?? '';
    data.fromMe = info.fromMe ?? false;
    data.category = info.category ?? 'misc';
    data.filename = info.filename ?? "Not Provided";
    
    commands.push(data);
    return data;
}

const AddCommand = cmd;
const Function = cmd;
const Module = cmd;

export { 
    cmd, 
    AddCommand, 
    Function, 
    Module 
};
