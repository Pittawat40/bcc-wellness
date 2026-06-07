export function useAppointmentNotify(callbacks?: {
  onNewAppointment?: () => void;
}) {
  const api = useAdminApi();
  const hasNew = ref(false);
  const newCount = ref(0);
  const isOnAppointmentPage = ref(false);
  const latestAppointments = ref<any[]>([]);

  function getLocalTime() {
    return new Date()
      .toLocaleString("sv-SE", { timeZone: "Asia/Bangkok" })
      .replace("T", " ")
      .slice(0, 19);
  }

  const state = {
    lastChecked: getLocalTime(),
  };
  let timer: ReturnType<typeof setInterval>;

  async function checkNew() {
    try {
      const res = await api.get(
        `/appointments/check-new?since=${encodeURIComponent(state.lastChecked)}`,
      );

      if (res.serverTime) {
        state.lastChecked = res.serverTime;
      }

      if (res.latest && res.latest.length > 0) {
        latestAppointments.value = res.latest;
      }

      if (res.hasNew) {
        if (isOnAppointmentPage.value) {
          callbacks?.onNewAppointment?.();
        } else {
          hasNew.value = true;
          newCount.value = res.count;
        }
      }
    } catch {}
  }

  function startPolling(intervalMs = 30000) {
    checkNew();
    timer = setInterval(checkNew, intervalMs);
  }

  function stopPolling() {
    clearInterval(timer);
  }

  function setOnAppointmentPage(val: boolean) {
    isOnAppointmentPage.value = val;
    state.lastChecked = getLocalTime();
    if (val) {
      hasNew.value = false;
      newCount.value = 0;
    }
  }

  return {
    hasNew,
    newCount,
    latestAppointments,
    startPolling,
    stopPolling,
    setOnAppointmentPage,
  };
}
