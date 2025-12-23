// import type { Meta, StoryObj } from '@storybook/react-vite';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//
// import { OpenLayer } from './Layer';
//
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 0,
//       gcTime: 0,
//     },
//   },
// });
//
// const meta = {
//   title: 'features/ideagraph/OpenLayer',
//   component: OpenLayer,
//   decorators: [
//     (Story) => (
//       <QueryClientProvider client={queryClient}>
//         <Story />
//       </QueryClientProvider>
//     ),
//   ],
// } satisfies Meta<typeof OpenLayer>;
//
// export default meta;
//
// type Story = StoryObj<typeof meta>;
//
// export const SixHatsLayer: Story = {
//   args: {
//     triggerGenerateNewLayer: () => {},
//     layerData: {
//       method: 'sixHats',
//       helpingPrompt: 'hehe haha',
//       baseIdea: 'летающие лодки, которые помогают кошкам добраться до врачей',
//     },
//   },
// };
//
// export const ScamperLayer: Story = {
//   args: {
//     triggerGenerateNewLayer: () => {},
//     layerData: {
//       method: 'scamper',
//       helpingPrompt: 'hehe haha',
//       baseIdea: 'летающие лодки, которые помогают кошкам добраться до врачей',
//     },
//   },
// };
