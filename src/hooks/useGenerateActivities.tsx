import { Urls } from '@src/core/constants/urls';
import { useAppDispatch } from '@src/store/hooks';
import { updatePlan } from '@src/store/slices/app.slice';
import { Activity } from '@src/types/activity';
import { Plan } from '@src/types/plan';
import { calculateDistance } from '@src/utils/calculate-distance';
import { generateGptPrompt } from '@src/utils/create-gpt-prompt';
import axios, { isAxiosError } from 'axios';
import React from 'react';

const useGenerateActivities = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const generateActivities = async (plan: Plan) => {
    setLoading(true);
    setError(null);
    const activities: Activity[] = [];

    try {
      const response = await axios.post(
        Urls.geminiGPT,
        {
          contents: [
            {
              parts: [
                {
                  text: generateGptPrompt(plan.destination),
                },
              ],
            },
          ],
          generationConfig: {
            response_mime_type: 'application/json',
          },
        },
        {
          params: {
            key: 'AIzaSyB0VneRzrtfiwnOTIQharTwqvvd1boQeEc',
          },
        },
      );

      const genTxt = response.data.candidates[0].content.parts[0].text;
      const parsedText = JSON.parse(genTxt) as { activities: any[] };

      if (parsedText.activities) {
        const tmpActs = parsedText.activities as any[];

        for (const act of tmpActs) {
          activities.push({
            tag: act.tag,
            name: act.name,
            address: act.address,
            description: act.description,
            distance: calculateDistance(
              { lat: plan.destination.latitude, lng: plan.destination.longitude },
              { lat: +act.latitude, lng: +act.longitude },
            ),
            latitude: +act.latitude,
            longitude: +act.longitude,
          });
        }
      }

      const payload: Plan = { ...plan, activities };
      dispatch(updatePlan(JSON.stringify(payload)));

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.error?.message);
      }
      setError('An error occurred while generating activities.');
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    generateActivities,
  };
};

export default useGenerateActivities;
