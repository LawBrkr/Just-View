"use client";

import { NextIntlClientProvider } from "next-intl";

export default function ClientIntlProvider({
  children,
  locale,
  messages,
  timeZone,
}: React.ComponentProps<typeof NextIntlClientProvider>) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}
