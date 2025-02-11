// E00XX - Incorrect Data type or Undefined
// E10XX - String validation
// E20XX - Number Validation
// E30XX - Array Validation
// E4XXX - App Errors +
// E90XX - Invalid entity
export const ErrorCodes = {
	// Invalid Data Type
	InvalidDataType: "E0001",
	// Extra parameter not part of expected request
	ExtraParameter: "E0002",
	// Undefined / Null
	NullOrUndefined: "E0003",

	//Received value not in a set of values
	NotInAllowedSet: "E0004",
	//Received value is in a set of disallowed values
	InDisallowedSet: "E0005",

	// Empty string passed where content expected
	EmptyString: "E1001",
	// Exact string length not met
	ExactStringLength: "E1002",
	// Minimum length not met
	MinStringLength: "E1003",
	// Maximum length of string exceeded
	MaxStringLength: "E1004",
	// Min-Max length of string not met
	MinMaxStringLength: "E1005",
	// Invalid Email Address
	InvalidEmail: "E1006",
	// Invalid URL
	InvalidUrl: "E1007",
	// Invalid Date FMT
	InvalidDate: "E1008",
	// Invalid Phone Number Format
	InvalidPhone: "E1009",
	// General Regular Expression
	InvalidRegex: "E1010",
	// 0 entered for a non-zero field
	NonZero: "E2001",
	// 0 or -ve entered for a +ve field
	Positive: "E2002",
	// 0 or +ve entered for a -ve field
	Negative: "E2003",
	// -ve entered for a 0 or +ve field
	PositiveOrZero: "E2004",
	// +ve entered for a 0 or -ve field
	NegativeOrZero: "E2005",
	// Min value not met
	Min: "E2006",
	// Max value exceeded
	Max: "E2007",
	// Min-Max value not met
	MinMax: "E2008",
	// Empty Array
	EmptyArr: "E3001",
	// Min length not met
	MinArrLength: "E3002",
	// Max length exceeded
	MaxArrLength: "E3003",
	// Min-Max length not met
	MinMaxArrLength: "E3004",
	// Array elements are invalid
	ArrElemInvalid: "E3005",

	/*App Logic Errors*/
	// Authentication Mode Already in Use
	IdentityInUse: "E4001",
	// Authentication credentials not found
	IdentityNotFound: "E4002",
	// Password does not match
	PasswordMismatch: "E4003",

	/*Entity Errors*/
	// Invalid session ID
	InvalidSessionId: "E9001",
	// Invalid org ID
	InvalidOrgId: "E9002",
	// Invalid team ID
	InvalidTeamId: "E9003",
	// Invalid User Id
	InvalidUserId: "E9004",
	// Object key does not exist (GET / DELETE)
	InvalidObjectKey: "E9005",
	// Media Object already exists (PUT)
	ObjectExists: "E9006",
	// Media Object parameters are invalid (Content Type, Size)
	ObjectParamsInvalid: "E9007",
	// Media Request ID is invalid
	RequestIdInvalid: "E9008",
	// Project ID is invalid
	ProjectIdInvalid: "E9009",
	// Project Quota Exceeded for Org Plan
	ProjectQuotaExceeded: "E9010",
	// User Quota Exceeded for Org Plan
	UserQuotaExceeded: "E9011",
	// Team Quota Exceeded for Org Plan
	TeamQuotaExceeded: "E9012",
	// Project Access Missing
	ProjectAccessMissing: "E9013",
	// Workflow Id is invalid
	WorkflowIdInvalid: "E9014",

	// Unknown error
	Unknown: "E9999",
} as const

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes]
