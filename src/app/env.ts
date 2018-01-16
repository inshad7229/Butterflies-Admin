const HTTP_TIMEOUT: number = 60000;

export interface Environment {
    mainApi: string;
    imgApi:string;
    img:string;
    dealDoc:string;
    analytics?: string;
    timeout: number;
    debug: boolean;
    bypass: boolean;
    angularProd: boolean;
}

export const LOCAL: Environment = {
    mainApi: 'http://127.0.0.1:3002',
    imgApi:'http://13.58.136.175/dealiver-rest-apis/public/img/profile_imgs/',
    img:'http://13.58.136.175/dealiver-rest-apis/public/img/deals_images/',
    dealDoc:'http://13.58.136.175/dealiver-rest-apis/public/img/deals_attachments/',
    timeout: HTTP_TIMEOUT,
    debug: true,
    bypass: true,
    angularProd: false
};
// http://13.58.136.175/dealiver-admin-apis/www/images/
export const DEV: Environment = {
    mainApi: 'http://18.221.208.210:3003/',
    imgApi:'http://18.221.208.210/dealiver-rest-apis/public/img/profile_imgs/',
    img:'http://18.221.208.210/dealiver-rest-apis/public/img/deals_images/',
    dealDoc:'http://18.221.208.210/dealiver-rest-apis/public/img/deals_attachments/',
    timeout: HTTP_TIMEOUT,
    debug: true,
    bypass: false,
    angularProd: false
};



export const PROD: Environment = {
    mainApi: 'http://18.221.208.210:3003/',
    imgApi:'http://18.221.208.210/dealiver-rest-apis/public/img/profile_imgs/',
    img:'http://18.221.208.210/public/butterflies/',
    dealDoc:'http://18.221.208.210/public/butterflies/',
    timeout: HTTP_TIMEOUT,
    debug: false,
    bypass: false,
    angularProd: false
};

export const ENV: Environment = PROD;