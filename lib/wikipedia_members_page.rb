# frozen_string_literal: true

require 'scraped'

# A Wikipedia page with a list of members of a legislature
class WikipediaMembersPage < Scraped::HTML
  field :positionholders do
    members
  end

  private

  def tables_with_header(str)
    noko.xpath(format('.//table[.//th[contains(
      translate(., "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"),
    "%s")]]', str.downcase))
  end

  def members
    @members ||= begin
      wanted_tables.xpath('.//tr[td]').map { |tr| fragment(tr => MembershipRow) }.reject(&:empty?).map(&:to_h)
    end
  end
end
