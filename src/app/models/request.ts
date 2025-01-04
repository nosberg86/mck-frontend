export interface RequestParam {
  criteria: string;
  country_code: string;
  position: number;
  contacts: number;
  emails_per_contact: number;
  search_speed: number;
  platforms: string;
  validate: boolean;
  requestId: number;
}

export interface ValidateParam {
  toList: string;
  contact_N: string;
  contact_U: string;
  requestId: number;
}

export interface RequestBody {
  message: string;
  s3key: string;
}

export interface RequestResultBody {
  message: any;
  s3key: string;
}

export interface Criteria {
  Criteria: string;
}

export interface ContactEmailResult {
  Email: string;
  Url: string;
  Score: number;
  Verified: boolean;
  isValid: boolean;
}

export interface ContactEmailsResult {
  Name: string;
  Profile: string;
  Emails: Array<ContactEmailResult>;
}

export interface Accounts {
  email: string;
  sents: number;
  lasDateOfUse: string;
}
export interface TemplateEditor {
  json: string;
  html: string;
}
export interface TemplateCard {
  id: number;
  Name: string;
  Description: string;
  Body: string;
  Json: string;
  Owner: number;
  Imported: number;
  ImgRoute: string;
  createdAt: string;
  updatedAt: string;
}
export interface EmailSending {
  aviableAccounts: number;
  unreachableAccounts: number;
  sendCapability: number;
  unreachableAccountsList: Array<Accounts>;
  aviableAccountsList: [];
}
export interface EmailCampaign {
  id_campaign: number;
  ListsIds: number[];
  from: string;
  subject: string;
  html_body: string;
}
export interface MHMRequestPaginate {
  totalItems: number;
  requests:  Array<MHMRequest>;
  totalPages: number;
  currentPage: number;
  limit: number;
}
export interface MHMRequest {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  params: string;
  paramsObj: RequestParam;
  percent: number;
  user: string;
  body: string;
  bodyObj: RequestBody;
  contact: number;
  valid_email: number;
}
export interface SearchsLogs {
  name: string;
  emails: string[];
}
export interface CampaignPaginate {
  totalItems: number;
  requests:  Array<Campaign>;
  totalPages: number;
  currentPage: number;
  limit: number;
}
export interface Campaign {
  id: number;
  Name: string;
  Subject: string;
  Status: string;
  TemplateId: number;
  Owner: number;
  Campaigns_Lists: Array<List>;
  ListId: number;
  createdAt: string;
  updatedAt: string;
}
export interface UCampaign {
  campaign: Campaign;
  campaigns_lists: Array<number>;
}
export interface CampaignDetails {
  Status: string;
  cant: number;
}
export interface CampaignDetailsByDate {
  DayofW: number;
  cant: number;
}
export interface ContactPaginate {
  totalItems: number;
  requests:  Array<Contacts>;
  totalPages: number;
  currentPage: number;
  limit: number;
}
export interface Filter {
  Column: string;
  Operator:  string;
  Value: any;
  kind: number;
}
export interface ListsContacts {
  IdContact: number;
  IdList: number;
  createdAt: string;
  updatedAt: string;
}
export interface Contacts {
  id: number;
  Name: string;
  Email: string;
  Owner: number;
  Sents: string;
  Openned: string;
  Clicked: string;
  createdAt: string;
  updatedAt: string;
  SentDate: string;
  user: User;
  BlackListed: number;
  Contacts_Lists: Array<List>;
  lists_contacts: ListsContacts;
  Campaigns_Sents:  Array<Campaign>;
}
export interface CompanyPaginate {
  totalItems: number;
  requests:  Array<Company>;
  totalPages: number;
  currentPage: number;
  limit: number;
}
export interface Company {
  id: number;
  idCompany: number;
  name: string;
  description: string;
  website: string;
  apiKey: string;
  imgRoute: string;
  imageUrl: string;
  Companies_Users: User;
  createdAt: string;
  updatedAt: string;
}
export interface ListPaginate {
  totalItems: number;
  requests:  Array<List>;
  totalPages: number;
  currentPage: number;
  limit: number;
}
export interface List {
  id: number;
  Name: string;
  Owner: number;
  createdAt: string;
  updatedAt: string;
  num_contacts: number;
  user: User;
  Lists_Contacts: Array<Contacts>;
  lists_contacts: ListsContacts;
  campaigns:  Array<Campaign>;
}
export interface CompaniesUsers {
  idUser: number;
  idCompany: number;
  apiKey: string;
  createdAt: string;
  updatedAt: string;
}
export interface User {
  id: number;
  userId: string;
  name: string;
  lastName: string;
  cognitoUID: string;
  planId: number;
  contactCont: number;
  criteriaCont: number;
  searchCont: number;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  validationCont: number;
  companies_users: CompaniesUsers;
  plan: Plan;
  isAdmin: number;
  createdAt: string;
  updatedAt: string;
}

export interface NavItem {
  title: string;
  disabled?: boolean;
  icon: string;
  route?: string;
  children?: NavItem[];
}
export interface Plan {
  id: number;
  name: string;
  price: number;
  stripePriceID: string;
  contactsPerSearch: number;
  searchsInMonth: number;
  criteriaInMonth: number;
  validationsInMonth: number;
  createdAt: string;
  updatedAt: string;
}
export interface SearchDetailsRequest {
  body: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  params: string;
  percent: number;
  status: string;
  user: string;
}

export interface SearchDetailsRequestStatus {
  body: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  idrequest: number;
  success: boolean;
  percent: number;
}
export interface SearchDetails {
  request: SearchDetailsRequest;
  requests_status: Array<SearchDetailsRequestStatus>;
}
