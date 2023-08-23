// Function to check if any date value in the list has changed in the last 10 minutes
function hasDateChanged(dateList) {
    const now = new Date();
    const timeThreshold = 10 * 60 * 1000; // 10 minutes in milliseconds
  
    for (const dateStr of dateList) {
      const dateField = new Date(dateStr);
      if (now.getTime() - dateField.getTime() <= timeThreshold) {
        return true;
      }
    }
    return false;
  }
  
  
  // Example usage in the main function for Airtable automation
  async function main() {
    const { ESP_I_MOD, ESP_W_MOD, ENG_I_MOD, ENG_W_MOD, FRA_I_MOD, FRA_W_MOD, POR_I_MOD,
             POR_W_MOD, EUSK_I_MOD, EUSK_W_MOD } = input.config();
  
    // Check if any of the date fields have changed in the last 10 minutes
    const hasESP_I_MODChanged = hasDateChanged(ESP_I_MOD);
    const hasESP_W_MODChanged = hasDateChanged(ESP_W_MOD);
    const hasENG_I_MODChanged = hasDateChanged(ENG_I_MOD);
    const hasENG_W_MODChanged = hasDateChanged(ENG_W_MOD);
    const hasFRA_I_MODChanged = hasDateChanged(FRA_I_MOD);
    const hasFRA_W_MODChanged = hasDateChanged(FRA_W_MOD);
    const hasPOR_I_MODChanged = hasDateChanged(POR_I_MOD);
    const hasPOR_W_MODChanged = hasDateChanged(POR_W_MOD);
    const hasEUSK_I_MODChanged = hasDateChanged(EUSK_I_MOD);
    const hasEUSK_W_MODChanged = hasDateChanged(EUSK_W_MOD);
    // Check other date fields...
    
  
    // Update "ENGI_STA" field if ENG_I_MOD has changed in the last 10 minutes
    if (hasENG_I_MODChanged == false) {
      output.set("ENGI_STA", "✅ OK");
    }
    if (hasENG_W_MODChanged == false) {
      output.set("ENGW_STA", "✅ OK");
    }
    if (hasESP_I_MODChanged == false) {
      output.set("ESPI_STA", "✅ OK");
    }
    if (hasESP_W_MODChanged == false) {
      output.set("ESPW_STA", "✅ OK");
    }
    if (hasFRA_I_MODChanged == false) {
      output.set("FRAI_STA", "✅ OK");
    }
    if (hasFRA_W_MODChanged == false) {
      output.set("FRAW_STA", "✅ OK");
    }
    if (hasPOR_I_MODChanged == false) {
      output.set("PORI_STA", "✅ OK");
    }
    if (hasPOR_W_MODChanged == false) {
      output.set("PORW_STA", "✅ OK");
    }
    if (hasEUSK_I_MODChanged == false) {
      output.set("EUSKI_STA", "✅ OK");
    }
    if (hasEUSK_W_MODChanged == false) {
      output.set("EUSKW_STA", "✅ OK");
    }
  
    if (
      !hasENG_I_MODChanged &&
      !hasENG_W_MODChanged &&
      !hasESP_I_MODChanged &&
      !hasESP_W_MODChanged &&
      !hasFRA_I_MODChanged &&
      !hasFRA_W_MODChanged &&
      !hasPOR_I_MODChanged &&
      !hasPOR_W_MODChanged &&
      !hasEUSK_I_MODChanged &&
      !hasEUSK_W_MODChanged
    ) {
      output.set("MODIFICACION", "✅ BLOQUE ACTUALIZADO");
    }
  }
  
  main();
  