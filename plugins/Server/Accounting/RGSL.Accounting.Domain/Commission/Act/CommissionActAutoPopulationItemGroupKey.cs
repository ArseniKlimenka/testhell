using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Commission.Act
{
    class CommissionActAutoPopulationItemGroupKey : IEquatable<CommissionActAutoPopulationItemGroupKey>
    {
        public CommissionActAutoPopulationItemGroupKey(ActAutoPopulationPc pc)
        {
            DocumentNo = pc.DocumentNo;
            SourceLineId = pc.SourceLineId;
            InstallmentDueDate = pc.InstallmentDueDate;
            BankStatementItemId = pc.BankStatementItemId;
            AaCommRate = pc.AaCommRate;
            AaExpensesRate = pc.AaExpensesRate;
            AaNaturalPersonRate = pc.AaNaturalPersonRate;
            AaSolePropriatorRate = pc.AaSolePropriatorRate;
            DocExpensesRate = pc.DocExpensesRate;
            DocNaturalPersonRate = pc.DocNaturalPersonRate;
            DocSolePropriatorRate = pc.DocSolePropriatorRate;
            DocCommRate = pc.DocCommRate;
            ManualCommRate = pc.ManualCommRate;
            IsTechnical = pc.IsTechnical;
        }

        public string DocumentNo { get; private set; }
        public string SourceLineId { get; private set; }
        public DateTime InstallmentDueDate { get; private set; }
        public long BankStatementItemId { get; private set; }

        public decimal AaCommRate { get; private set; }
        public decimal AaExpensesRate { get; private set; }
        public decimal AaNaturalPersonRate { get; private set; }
        public decimal AaSolePropriatorRate { get; private set; }
        public decimal? DocExpensesRate { get; private set; }
        public decimal? DocNaturalPersonRate { get; private set; }
        public decimal? DocSolePropriatorRate { get; private set; }
        public decimal? DocCommRate { get; private set; }
        public decimal? ManualCommRate { get; private set; }
        public bool IsTechnical { get; private set; }

        public override bool Equals(object obj)
        {
            return Equals(obj as CommissionActAutoPopulationItemGroupKey);
        }

        public bool Equals(CommissionActAutoPopulationItemGroupKey other)
        {
            if (other == null)
            {
                return false;
            }

            Type type = typeof(CommissionActAutoPopulationItemGroupKey);
            foreach (System.Reflection.PropertyInfo pi in type.GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance))
            {
                object selfValue = type.GetProperty(pi.Name).GetValue(this, null);
                object toValue = type.GetProperty(pi.Name).GetValue(other, null);

                if (selfValue != toValue && (selfValue == null || !selfValue.Equals(toValue)))
                {
                    return false;
                }
            }
            return true;
        }

        public override int GetHashCode()
        {
            unchecked //Ignores overflows that can (should) occur
            {
                int hashCode = 0;
                Type type = GetType();
                foreach (System.Reflection.PropertyInfo pi in type.GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance))
                {
                    object value = pi.GetValue(this);
                    hashCode = (hashCode * 397) ^ (value != null ? value.GetHashCode() : 0);
                }
                return hashCode;
            }
        }
    }
}
