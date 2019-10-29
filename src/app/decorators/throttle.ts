import t from 'lodash.throttle';


export function throttle( milliseconds : number = 500 ) : MethodDecorator {
    return function ( target : any, propertyKey : string, descriptor : PropertyDescriptor ) {
        const original = descriptor.value;
        descriptor.value = t(original, milliseconds);
        return descriptor;
    };
}
