import {requireChatGPTUser} from '../chatgpt-auth';
import CRM from '@/components/crm';
export const dynamic='force-dynamic';
export default async function Page(){await requireChatGPTUser('/crm');return <CRM/>;}

