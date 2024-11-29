export interface OneDto {
    merchantId: string;
    merchantPassword: string; 
    amount: number; 
    merchantOrderId: string;
    merchantTimestamp: string;
    successUrl: string;            
    failedUrl: string;               
    errorUrl: string;                
    merchantPan: string;             
    success: boolean;                 
    message: string;                  
    paymentUrl: string;               
    paymentId: string;                
    acquirerOrderId: string;          
    acquirerTimestamp: string;       
    issuerOrderId: string;            
    issuerTimestamp: string;          
    port: string;                     
}