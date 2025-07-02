using Adacta.AdInsure.Shell.API.Internal.Dashboards.DTO;
using Adacta.AdInsure.Shell.API.Internal.Dashboards.Services;
using Adacta.AdInsure.Shell.Domain.Dashboard.Models;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Shell.Dashboards
{
    public class DashboardsGlobalServiceRGSL : IDashboardsGlobalService
    {
        private readonly IDashboardsGlobalService _coreService;

        public DashboardsGlobalServiceRGSL(IDashboardsGlobalService coreService)
        {
            _coreService = coreService;
        }

        public bool AssignActivity(AssignActivityParams assignActivityParams)
        {
            return _coreService.AssignActivity(assignActivityParams);
        }

        public DashboardModel CreateDashboard(DashboardRequest request)
        {
            return _coreService.CreateDashboard(request);
        }

        public void DeleteDashboard(string id)
        {
            _coreService.DeleteDashboard(id);
        }

        public GetAboutInfoResponse GetAboutInfo()
        {
            GetAboutInfoResponse info = _coreService.GetAboutInfo();
            info.Database = string.Empty;
            return info;
        }

        public IList<DashboardModel> GetAllDashboards()
        {
            return _coreService.GetAllDashboards();
        }

        public DashboardModel GetDashboardById(string id)
        {
            return _coreService.GetDashboardById(id);
        }

        public GetDashboardGlobalInitViewModelResponse GetDashboardGlobalInitViewModel()
        {
            return _coreService.GetDashboardGlobalInitViewModel();
        }

        public GroupMember[] GetGroupMemebers(string groupId)
        {
            return _coreService.GetGroupMemebers(groupId);
        }

        public GetServerVersionResponse GetServerVersion()
        {
            return _coreService.GetServerVersion();
        }

        public dynamic GetUserGroups(string userId)
        {
            return _coreService.GetUserGroups(userId);
        }

        public DashboardModel UpdateDashboard(UpdateDashboardRequest request)
        {
            return _coreService.UpdateDashboard(request);
        }
    }
}
