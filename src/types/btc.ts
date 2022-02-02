export interface BtcGlobal {
    op: string;
    x: BtcType;
}

export interface BtcType {
    inputs: InputBtc[];
    out: outBtc[];
    hash: string
    size: number
}

export interface InputBtc {
    prev_out: prevOut;
    sequence: string
}
export interface prevOut {
    addr: string
}
export interface outBtc {
    addr: string
}