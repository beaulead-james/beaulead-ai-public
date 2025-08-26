import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '../../lib/queryClient';
import { useToast } from '../../hooks/use-toast';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  budget: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  privacy: z.boolean().refine((val) => val === true, "Privacy agreement is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      budget: '',
      message: '',
      privacy: false,
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: t.contact.form.success,
      });
      form.reset();
    },
    onError: (error) => {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: t.contact.form.error,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const budgetOptions = [
    { value: '', label: '예산 범위를 선택해주세요' },
    { value: '100만원 미만', label: '100만원 미만' },
    { value: '100-300만원', label: '100-300만원' },
    { value: '300-500만원', label: '300-500만원' },
    { value: '500-1000만원', label: '500-1000만원' },
    { value: '1000만원 이상', label: '1000만원 이상' },
    { value: '협의', label: '협의' },
  ];

  return (
    <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testid="label-name">{t.contact.form.nameLabel}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t.contact.form.namePlaceholder} 
                      {...field} 
                      data-testid="input-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel data-testid="label-phone">{t.contact.form.phoneLabel}</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel"
                      placeholder={t.contact.form.phonePlaceholder} 
                      {...field} 
                      data-testid="input-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel data-testid="label-email">{t.contact.form.emailLabel}</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder={t.contact.form.emailPlaceholder} 
                    {...field} 
                    data-testid="input-email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel data-testid="label-budget">{t.contact.form.budgetLabel}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-budget">
                      <SelectValue placeholder="예산 범위를 선택해주세요" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {budgetOptions.slice(1).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel data-testid="label-message">{t.contact.form.messageLabel}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t.contact.form.messagePlaceholder}
                    className="resize-none"
                    rows={6}
                    {...field}
                    data-testid="textarea-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privacy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    data-testid="checkbox-privacy"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-gray-600" data-testid="label-privacy">
                    {t.contact.form.privacyLabel}{' '}
                    <a href="/privacy" className="text-primary-600 hover:text-primary-700 underline" data-testid="link-privacy">
                      {t.contact.form.privacyLink}
                    </a>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full" 
            disabled={contactMutation.isPending}
            data-testid="button-submit"
          >
            {contactMutation.isPending ? 'Sending...' : t.contact.form.submitButton}
          </Button>

          <p className="text-center text-sm text-gray-500" data-testid="text-response-time">
            {t.contact.form.responseTime}
          </p>
        </form>
      </Form>
    </div>
  );
}
