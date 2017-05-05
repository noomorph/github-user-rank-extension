import {GitlanceBadgeData} from './gitlance.schema';

export interface GUREMessage {
    thread: number;
    type: string;
    data?: any;
}

export interface FetchGitlanceDataRequest extends GUREMessage {
    type: 'FetchGitlanceDataRequest';
    data: {
        login: string;
    }
}

export interface ReportBIRequest extends GUREMessage {
    type: 'ReportBIRequest';
    data: {
        eventCode: number;
    }
}

export interface FetchGitlanceDataResponse extends GUREMessage {
    type: 'FetchGitlanceDataResponse';
    data: GitlanceBadgeData[];
}

export type GUREContentMessage = FetchGitlanceDataRequest | ReportBIRequest;
export type GUREBackgroundMessage = FetchGitlanceDataResponse;
