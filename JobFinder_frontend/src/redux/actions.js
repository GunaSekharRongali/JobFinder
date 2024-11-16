// Action to add a job to applied jobs list
export const addAppliedJob = (jobId) => {
    return {
        type: 'ADD_APPLIED_JOB',
        payload: jobId,
    };
};