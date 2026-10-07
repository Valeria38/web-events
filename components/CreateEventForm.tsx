'use client';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { CATEGORIES } from '@/app/constants';
import type { ActionState } from '@/lib/actions/event.actions';
import { createEvent } from '@/lib/actions/event.actions';

import AgendaInput from './AgendaInput';
import ImageInput from './ImageInput';
import InputError from './InputError';
import SubmitButton from './SubmitButton';
import TagInput from './TagInput';

const initialState: ActionState = {
  message: '',
  success: false,
  status: 'idle',
  errors: {},
  inputs: {},
  timestamp: 0,
};

const CreateEventForm = () => {
  const lastProcessedTimestamp = useRef<number | null>(null);

  const [formKey, setFormKey] = useState(0);
  const [state, formAction] = useActionState(createEvent, initialState);

  const { push } = useRouter();
  const hasError = (fieldName: keyof typeof state.errors) => !!state?.errors?.[fieldName];
  const inputClass = (fieldName: keyof typeof state.errors, extra = '') =>
    `bg-neutral-900 border p-3 rounded-xl text-white outline-none focus:border-[#6EE7B7] ${
      hasError(fieldName) ? 'border-red-700' : 'border-neutral-700'
    } ${extra}`;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (state?.status === 'success' && state.timestamp !== lastProcessedTimestamp.current) {
      lastProcessedTimestamp.current = state.timestamp;
      toast.dismiss();
      toast.success('Event has been successfully created! Redirecting...');

      timeoutId = setTimeout(() => {
        push('/events');
        setFormKey((prev) => prev + 1);
      }, 1000);
    }
    if (state?.status === 'error') {
      console.log('Event creation error: ', state?.errors);
      toast.error('Event creation failed. Please check errors in the form fields.');
    }
    return () => clearTimeout(timeoutId);
  }, [state?.timestamp, state?.status, state?.errors, push]);

  return (
    <section>
      <div className="max-w-3xl mx-auto bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-8">
          Create <span className="text-[#6EE7B7]">Event</span>
        </h2>

        <form key={formKey} action={formAction} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-neutral-400 text-sm">
              Event Title
            </label>
            <input
              id="title"
              name="title"
              required
              defaultValue={typeof state?.inputs?.title === 'string' ? state?.inputs?.title : ''}
              placeholder="Enter title"
              className={inputClass('title', 'transition')}
            />
            <InputError isHidden={!hasError('title')}>{state?.errors?.title?.[0]}</InputError>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="text-neutral-400 text-sm">
                Date
              </label>

              <input
                id="date"
                required
                name="date"
                type="date"
                defaultValue={typeof state?.inputs?.date === 'string' ? state?.inputs?.date : ''}
                className={inputClass('date', 'custom-date-input')}
              />

              <InputError isHidden={!hasError('date')}>{state?.errors?.date?.[0]}</InputError>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="text-neutral-400 text-sm">
                Location
              </label>
              <input
                id="location"
                required
                name="location"
                placeholder="Venue or Link"
                defaultValue={
                  typeof state?.inputs?.location === 'string' ? state?.inputs?.location : ''
                }
                className={inputClass('location')}
              />
              <InputError isHidden={!hasError('location')}>
                {state?.errors?.location?.[0]}
              </InputError>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-neutral-400 text-sm">
              Description
            </label>
            <textarea
              id="description"
              required
              name="description"
              placeholder="Short summary..."
              defaultValue={
                typeof state?.inputs?.description === 'string' ? state?.inputs?.description : ''
              }
              rows={3}
              className={inputClass('description', 'resize-none')}
            />
            <InputError isHidden={!hasError('description')}>
              {state?.errors?.description?.[0]}
            </InputError>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="overview" className="text-neutral-400 text-sm">
              Full Overview
            </label>
            <textarea
              id="overview"
              required
              name="overview"
              defaultValue={
                typeof state?.inputs?.overview === 'string' ? state?.inputs?.overview : ''
              }
              placeholder="Detailed information..."
              rows={5}
              className={inputClass('overview', 'resize-none')}
            />
            <InputError isHidden={!hasError('overview')}>{state?.errors?.overview?.[0]}</InputError>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-neutral-400 text-sm" htmlFor="organizer">
              Organizer
            </label>
            <input
              id="organizer"
              name="organizer"
              required
              defaultValue={
                typeof state?.inputs?.organizer === 'string' ? state?.inputs?.organizer : ''
              }
              placeholder="e.g. Google Cloud organizes events..."
              className={inputClass('organizer')}
            />
            <InputError isHidden={!hasError('organizer')}>
              {state?.errors?.organizer?.[0]}
            </InputError>
          </div>

          <div className="flex flex-col gap-2">
            <ImageInput error={state?.errors?.image?.[0]} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="venue" className="text-neutral-400 text-sm">
              Venue (Location)
            </label>
            <input
              id="venue"
              name="venue"
              required
              defaultValue={typeof state?.inputs?.venue === 'string' ? state?.inputs?.venue : ''}
              placeholder="e.g. Moscone Center"
              className={inputClass('venue', 'transition')}
            />
            <InputError isHidden={!hasError('venue')}>{state?.errors?.venue?.[0]}</InputError>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="text-neutral-400 text-sm">
              Time
            </label>
            <input
              id="time"
              name="time"
              required
              defaultValue={typeof state?.inputs?.time === 'string' ? state?.inputs?.time : ''}
              placeholder="8:00"
              className={inputClass('time', 'transition')}
            />
            <InputError isHidden={!hasError('time')}>{state?.errors?.time?.[0]}</InputError>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="audience" className="text-neutral-400 text-sm">
              Audience
            </label>
            <input
              id="audience"
              name="audience"
              required
              defaultValue={
                typeof state?.inputs?.audience === 'string' ? state?.inputs?.audience : ''
              }
              placeholder="Cloud engineers, DevOps"
              className={inputClass('audience', 'transition')}
            />
            <InputError isHidden={!hasError('audience')}>{state?.errors?.audience?.[0]}</InputError>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="mode" className="text-neutral-400 text-sm">
              Event Mode
            </label>
            <select
              id="mode"
              name="mode"
              className={inputClass('mode', 'appearance-none cursor-pointer')}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category.slice(0, 1).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <InputError isHidden={!hasError('mode')}>{state?.errors?.mode?.[0]}</InputError>
          </div>

          <TagInput error={state?.errors?.tags?.[0]} />
          <AgendaInput error={state?.errors?.agenda?.[0]} />

          <SubmitButton />
        </form>
      </div>
    </section>
  );
};

export default CreateEventForm;
