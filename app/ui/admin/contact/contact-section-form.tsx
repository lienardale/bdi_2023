'use client';

import { useActionState, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { toast } from 'sonner';
import { Button } from '@/app/ui/button';
import {
  createContactSection,
  updateContactSection,
  type ContactSectionState,
} from '@/app/lib/actions';
import {
  CONTACT_ICON_KEYS,
  CONTACT_SECTION_KINDS,
  contactSectionHref,
  contactSectionIcon,
} from '@/app/lib/contact-sections';
import { ContactSectionIcon } from '@/app/ui/contact/section-icons';
import type {
  ContactIconKey,
  ContactSectionKind,
  ContactSectionRow,
} from '@/app/lib/definitions';

const inputClass =
  'block w-full rounded-md border border-input bg-background py-2 px-3 text-sm';

function FieldErrors({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <div className="mt-2 text-sm text-destructive">
      {errors.map((e) => (
        <p key={e}>{e}</p>
      ))}
    </div>
  );
}

export default function ContactSectionForm({
  section,
}: {
  section?: ContactSectionRow;
}) {
  const t = useTranslations('adminContact');
  const tCommon = useTranslations('common');

  const initialState: ContactSectionState = { message: null, errors: {} };
  const action = section
    ? updateContactSection.bind(null, section.id)
    : createContactSection;
  const [state, dispatch] = useActionState<ContactSectionState, FormData>(
    action,
    initialState,
  );

  const [kind, setKind] = useState<ContactSectionKind>(section?.kind ?? 'mail');
  // Empty string means "no explicit choice" — the kind then decides the glyph.
  const [icon, setIcon] = useState<ContactIconKey | ''>(section?.icon ?? '');
  const [value, setValue] = useState(section?.value ?? '');
  const [isDirty, setIsDirty] = useState(false);
  const [prevState, setPrevState] = useState(state);

  if (prevState !== state) {
    setPrevState(state);
    if (state.success) setIsDirty(false);
  }

  useEffect(() => {
    if (state.success) toast.success(state.message || 'OK');
    else if (state.message && !state.success) toast.error(state.message);
  }, [state]);

  const kindLabels: Record<ContactSectionKind, string> = {
    mail: t('kindMail'),
    phone: t('kindPhone'),
    link: t('kindLink'),
  };
  const iconLabels: Record<ContactIconKey, string> = {
    envelope: t('iconEnvelope'),
    phone: t('iconPhone'),
    link: t('iconLink'),
    facebook: t('iconFacebook'),
    instagram: t('iconInstagram'),
    website: t('iconWebsite'),
    x: t('iconX'),
    youtube: t('iconYoutube'),
  };
  const valueHelp: Record<ContactSectionKind, string> = {
    mail: t('valueHelpMail'),
    phone: t('valueHelpPhone'),
    link: t('valueHelpLink'),
  };

  // Live echo of what the card will actually link to, so an admin sees the
  // mailto:/tel: prefix appear rather than guessing.
  const preview = contactSectionHref(kind, value);
  const effectiveIcon = contactSectionIcon(kind, icon || null);

  return (
    <form action={dispatch} onChange={() => setIsDirty(true)}>
      <div className="rounded-md border border-border bg-card p-4 md:p-6">
        {/* Kind */}
        <div className="mb-4">
          <label htmlFor="kind" className="mb-2 block text-sm font-medium">
            {t('kind')}
          </label>
          <select
            id="kind"
            name="kind"
            value={kind}
            onChange={(e) => setKind(e.target.value as ContactSectionKind)}
            className={inputClass}
          >
            {CONTACT_SECTION_KINDS.map((k) => (
              <option key={k} value={k}>
                {kindLabels[k]}
              </option>
            ))}
          </select>
          <FieldErrors errors={state.errors?.kind} />
        </div>

        {/* Icon */}
        <div className="mb-4">
          <label htmlFor="icon" className="mb-2 block text-sm font-medium">
            {t('icon')}
          </label>
          <div className="flex items-center gap-3">
            <select
              id="icon"
              name="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value as ContactIconKey | '')}
              className={inputClass}
            >
              <option value="">{t('iconAuto')}</option>
              {CONTACT_ICON_KEYS.map((key) => (
                <option key={key} value={key}>
                  {iconLabels[key]}
                </option>
              ))}
            </select>
            <span className="shrink-0 rounded-md border border-border p-2 text-primary">
              <ContactSectionIcon icon={effectiveIcon} className="h-5 w-5" />
            </span>
          </div>
          <FieldErrors errors={state.errors?.icon} />
        </div>

        {/* Value */}
        <div className="mb-6">
          <label htmlFor="value" className="mb-2 block text-sm font-medium">
            {t('value')}
          </label>
          <input
            id="value"
            name="value"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-muted-foreground">{valueHelp[kind]}</p>
          {value.trim() !== '' && (
            <p className="mt-1 text-xs">
              {preview ? (
                <span className="text-muted-foreground">
                  {t('linkPreview')} <code className="text-foreground">{preview}</code>
                </span>
              ) : (
                <span className="text-destructive">{t('invalidValue')}</span>
              )}
            </p>
          )}
          <FieldErrors errors={state.errors?.value} />
        </div>

        {/* French copy */}
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="titleFr" className="mb-2 block text-sm font-medium">
              {t('titleFr')}
            </label>
            <input
              id="titleFr"
              name="titleFr"
              type="text"
              defaultValue={section?.titleFr ?? ''}
              className={inputClass}
            />
            <FieldErrors errors={state.errors?.titleFr} />
          </div>
          <div>
            <label htmlFor="textFr" className="mb-2 block text-sm font-medium">
              {t('textFr')}
            </label>
            <input
              id="textFr"
              name="textFr"
              type="text"
              defaultValue={section?.textFr ?? ''}
              className={inputClass}
            />
            <FieldErrors errors={state.errors?.textFr} />
          </div>
        </div>

        {/* English copy */}
        <p className="mb-2 text-xs text-muted-foreground">{t('englishHelp')}</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="titleEn" className="mb-2 block text-sm font-medium">
              {t('titleEn')}
            </label>
            <input
              id="titleEn"
              name="titleEn"
              type="text"
              defaultValue={section?.titleEn ?? ''}
              className={inputClass}
            />
            <FieldErrors errors={state.errors?.titleEn} />
          </div>
          <div>
            <label htmlFor="textEn" className="mb-2 block text-sm font-medium">
              {t('textEn')}
            </label>
            <input
              id="textEn"
              name="textEn"
              type="text"
              defaultValue={section?.textEn ?? ''}
              className={inputClass}
            />
            <FieldErrors errors={state.errors?.textEn} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/contact"
          className="flex h-10 items-center rounded-lg bg-muted px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70"
        >
          {tCommon('cancel')}
        </Link>
        <Button type="submit" disabled={Boolean(section) && !isDirty}>
          {section ? tCommon('edit') : tCommon('create')}
        </Button>
      </div>
    </form>
  );
}
