import { Injectable } from '@angular/core';
import { ModelAdapter } from './model-adapter';

export interface IStayPeriod{
    start: Date;
    end: Date;
}

export class StayPeriod implements IStayPeriod{
    start: Date;
    end: Date;

    constructor(obj?: IStayPeriod){
        if(obj){
            Object.assign(this,obj);
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class StayPeriodAdapter implements ModelAdapter<StayPeriod>{

    adapt(item: any): StayPeriod {
        const obj = new StayPeriod(item);

        if(item.start){
            obj.start = new Date(item.start);
        }

        if(item.end){
            obj.end = new Date(item.end);
        }

        return obj;
    }
    
}