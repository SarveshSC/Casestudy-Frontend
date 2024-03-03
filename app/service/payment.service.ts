import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from './booking.service';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  amount : number = 0;
  flag : boolean = false;
  paymentId : string = '';

  constructor(private router : Router, private bookingService : BookingService) { }

  initiatePayment(amount : number): void {
     
    const options = {
      key: 'rzp_test_wMdnTMmRy3ka78',
      amount: amount * 100,
      name: 'Simply Fly',
      description: 'Payment for Purchase',
      handler: (response : any) => {
        console.log('Payment ID:', response.razorpay_payment_id);
        console.log('Payment Signature:', response.razorpay_signature);
        // Handle payment success   
        this.paymentId = response.razorpay_payment_id;
        this.bookingService.setPaymentId(this.paymentId);

        this.bookingService.bookFlights();
        this.router.navigate(['/customer/booking-success'])

      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#F37254'
      }
    };
    var razorpay = new Razorpay(options);
    razorpay.open(); 

    // this.router.navigate(['/customer/payment']);
  }

  setAmount(amount : number){
    console.log(amount);
    this.amount = amount;
  }

  getAmount(){
    return this.amount;
  }

  route(){
  }
}
