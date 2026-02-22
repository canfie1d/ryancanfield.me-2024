import { defineType, defineField } from 'sanity'

export const journeyContent = defineType({
  name: 'journeyContent',
  title: "Journey's End Content",
  type: 'document',
  fields: [
    defineField({
      name: 'meta',
      type: 'string',
      title: 'Page Meta',
      initialValue: '﹖﹖﹖﹖',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: "Journey's End",
    }),
    defineField({
      name: 'introWithCode',
      type: 'text',
      title: 'Intro (with code param)',
      initialValue:
        "You actually did it. You followed the clues, found the code, and made it all the way here. I genuinely didn't expect everyone to go this far — but here you are.",
    }),
    defineField({
      name: 'introNoCode',
      type: 'text',
      title: 'Intro (no code param)',
      initialValue:
        "You got here fast. Maybe you knew where you were going, or maybe you were just wandering and got lucky. Either way — welcome.",
    }),
    defineField({
      name: 'enterCodePrompt',
      type: 'text',
      title: 'Enter Code Prompt',
      initialValue:
        "If you've found the code along your travels, enter it here to claim your reward.",
    }),
    defineField({
      name: 'journeyEndsIntro',
      type: 'text',
      title: "Journey's End Intro (JourneyToEryndor)",
      initialValue: "This is where your journey ends.",
    }),
    defineField({
      name: 'noCodeHint',
      type: 'text',
      title: 'No Code Hint',
      initialValue:
        "I see, however, that you have no code. You definitely know where to look but you're digging too deep.",
    }),
    defineField({
      name: 'rewardMessage',
      type: 'text',
      title: 'Reward Message',
      initialValue:
        "Your determination has been rewarded.\nA shiny new theme is available for your collection!",
    }),
    defineField({
      name: 'eryndorAvailableMessage',
      type: 'text',
      title: 'Eryndor Available Message',
      initialValue:
        "Eryndor is available in the theme menu.\nI hope you had as much fun finding this as I had hiding it.",
    }),
    defineField({
      name: 'thanksParticipating',
      type: 'string',
      title: 'Thanks Participating',
      initialValue: 'Thanks for participating.',
    }),
    defineField({
      name: 'activateButton',
      type: 'string',
      title: 'Activate Button',
      initialValue: 'Activate Eryndor',
    }),
    defineField({
      name: 'switchButton',
      type: 'string',
      title: 'Switch Button',
      initialValue: 'Switch to Eryndor',
    }),
    defineField({
      name: 'story',
      type: 'array',
      title: 'Story (JourneysEnd)',
      of: [{ type: 'block' }],
      description: 'The story prose shown after unlocking Eryndor',
    }),
    defineField({
      name: 'thanksWalking',
      type: 'text',
      title: 'Thanks Walking',
      initialValue: "Thanks for walking the road.\n— Ryan",
    }),
  ],
})
