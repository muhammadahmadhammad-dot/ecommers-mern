import { z } from 'zod';

export const orderValidationSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'Product ID is required'),
        title: z.string().min(1, 'Product title is required'),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
        price: z.number().min(0, 'Price must be at least 0'),
      })
    )
    .min(1, 'At least one item is required'),
  
  shippingInfo: z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(10, 'Phone is required'),
    email: z.string().min(10, 'Email is required'),
    address: z.string().min(1, 'Address is required'),
  }),

  totalAmount: z.number().min(0, 'Total amount must be at least 0'),


});
export const orderStatusValidationSchema = z.object({
  status: z.enum(['Processing', 'Shipped', 'Delivered', 'Cancelled'])
});

