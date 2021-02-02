export const DailyReport = {
    project:'/api/v1/projects',
    save:'/api/v1/sitereports/CreateDailySiteReport',


    saveGen:'/api/v1/sitereports/generalsummary',
    saveHse:'/api/v1/sitereports/hsereports',
    saveDailyProgressMeasurement:'/api/v1/sitereports/dailyprogressmeasurement',
    saveConstructionActivities:'/api/v1/sitereports/constructionActivities',
    saveProgressPictures:'/api/v1/sitereports/progresspictures',
    saveOtherSite:'/api/v1/sitereports/othersites',

}

export const ConstructionReport={
save:'/api/v1/sitereports/CreateTechnicalQueries',
AttentionReply:'/api/v1/sitereports/AttentionReply',
InitiatorReply:'/api/v1/sitereports/InitiatorReply'
}

export const NonConformanceReport= {
    save:'/api/v1/sitereports/NonTechnicalQuery'
}

export const generalResource = {
    nationality:'/api/v1/miscellaneous/GetAllCountry',
    state:'/api/v1/miscellaneous/GetAllState',
    city:'/api/v1/miscellaneous/GetAllCity',
    staff:'/api/v1/miscellaneous/GetAllStaff',
    Ctq:'/api/v1/miscellaneous/GetAllSRCTechnicalQueries',
    attendeeCtq:'/api/v1/miscellaneous/GetAllSRCTQForAttendee',
    InitiatorCtq:'/api/v1/miscellaneous/GetAllSRCTQForInitiator',
    supplier:'/api/v1/miscellaneous/GetAllSupplier',
    companies:'/api/v1/miscellaneous/GetAllCompanyQueries',
    roles:'/api/v1/miscellaneous/getRoles'
}

export const file_Upload ={
    single:'/api/v1/miscellaneous/PostFileContent',
    multiple:'/api/v1/miscellaneous/PostMultipleFileContent',
}

export const Register_User = {
save:'/api/v1/users/register'
}